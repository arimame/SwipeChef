class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token


  def new

  end


  def create
    user = User.new(user_create_params)

    username = params[:username]

    username_downcase = username.downcase

    user.username = username_downcase

    user.vegan = false
    user.vegetarian = false
    user.gluten_allergy = false
    user.peanut_allergy = false
    user.seafood_allergy = false
    user.dairy_allergy = false
    user.soy_allergy = false
    user.egg_allergy = false
    user.tree_nut_allergy = false
    user.wheat_allergy = false

    user.query_string = ""
    user.photo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmGRbg0zgj_aGlIjzN0t8bA6RCJjP5Puc3jxyltW2n0kg86cerug"

    if user.save

      payload = {id: user.id.to_s}

      token = JWT.encode payload, ENV['HMAC_SECRET'], 'HS256'


      respond_to do |format|
        format.json { render json: token}
      end

    else

      respond_to do |format|
        format.json { render json: "400 - ERROR - Please make sure your passwords match".to_json}
      end

    end

  end

  def login

    # If the user exists AND the password entered is correct.
    if user = User.authenticate_with_credentials(params[:email], params[:password])
      # Save the user id inside the browser cookie. This is how we keep the user
      # logged in when they navigate around our website.

      payload = {id: user.id.to_s}

      token = JWT.encode payload, ENV['HMAC_SECRET'], 'HS256'

      respond_to do |format|
        format.json { render json: token}
      end

    else
      respond_to do |format|
        format.json { render json: "400 - ERROR - Please make sure you entered your password correctly".to_json}
      end

    end

  end

  def verify_token

    begin
      decoded_token = JWT.decode user_params[:swipeChefToken], ENV['HMAC_SECRET'], true, { algorithm: 'HS256' }


      user_id = decoded_token[0]['id'].to_i
      puts user_id
      puts "------------------------------------- user id"
      user = User.find(user_id)

      puts user
      puts "------------------------------- user"

        respond_to do |format|
          format.json { render json: "200 - token verified".to_json}
        end

    rescue

        respond_to do |format|
          format.json { render json: "400 - no token".to_json}
        end

    end

  end


  def show
    begin

      decoded_token = JWT.decode user_params[:swipeChefToken], ENV['HMAC_SECRET'], true, { algorithm: 'HS256' }

      user_id = decoded_token[0]['id'].to_i

      if params[:usernameToVisit].length >= 1
        @user = User.find_by username: params[:usernameToVisit]
      else
        @user = User.find(user_id)
      end

      @userResponse = {
        username: @user.username,
        photo: @user.photo,
        tagline: @user.tagline,
        bookUser: @user.id
      }
      puts @userResponse
      puts "----------------------------user Response Photo"

      respond_to do |format|
        format.json { render json: @userResponse.to_json}
      end
    rescue
      respond_to do |format|
        format.json { render json: "400 ERROR - Wrong_Token".to_json}
      end
    end
  end

  def update
    #@user_params = user_params

    decoded_token = JWT.decode user_params[:swipeChefToken], ENV['HMAC_SECRET'], true, { algorithm: 'HS256' }

    user_id = decoded_token[0]['id'].to_i

    puts decoded_token

      if user_params[:photo]
        original_filename = params[:photo].original_filename

        extension_index = original_filename.rindex('.')

        filename_body = original_filename.slice(0, extension_index)

        filename_extension = original_filename.slice(extension_index, original_filename.length)
        puts filename_extension
        puts "filename extension ------------------------"

        puts original_filename
        puts "original_filename -------------------------"

        name = filename_body + user_id.to_s + filename_extension

        path = File.join("public", "images", name)
        File.open(path, "wb") { |f| f.write(params[:photo].read) }



        @user = User.find(user_id)
        @user.photo = "images/#{name}"

        photo = @user.photo
        @user.save

        respond_to do |format|
          format.json { render json: photo.to_json}
        end


      end

      if user_params[:tagline]
        @user = User.find(user_id)
        @user.tagline = user_params[:tagline]
        @user.save

        respond_to do |format|
          format.json { render json: "hello".to_json}
        end

      end

      if params[:setting]

        setting_string = params[:setting]

        setting_value_boolean = params[:setting_value] == "true" ? true : false

        puts params[:setting]
        puts "------------------------ setting"

        @user = User.find(user_id)
        @user.write_attribute(setting_string, setting_value_boolean)

        vegan_string            = @user.vegan ? "&allowedDiet[]=386^Vegan" : ""
        vegetarian_string       = @user.vegetarian ? "&allowedDiet[]=387^Lacto-ovo+vegetarian" : ""
        gluten_allergy_string   = @user.gluten_allergy ? "&allowedAllergy[]=393^Gluten-Free" : ""
        peanut_allergy_string   = @user.peanut_allergy ? "&allowedAllergy[]=394^Peanut-Free" : ""
        seafood_allergy_string  = @user.seafood_allergy ? "&allowedAllergy[]=398^Seafood-Free" : ""
        dairy_allergy_string    = @user.dairy_allergy ? "&allowedAllergy[]=396^Dairy-Free" : ""
        egg_allergy_string      = @user.egg_allergy ? "&allowedAllergy[]=397^Egg-Free" : ""
        soy_allergy_string      = @user.soy_allergy ? "&allowedAllergy[]=400^Soy-Free" : ""
        tree_nut_allergy_string = @user.tree_nut_allergy ? "&allowedAllergy[]=395^Tree+Nut-Free" : ""
        wheat_allergy_string    = @user.wheat_allergy ? "&allowedAllergy[]=392^Wheat-Free" : ""

        puts vegan_string
        puts "--------------------------------------------------- query_string"
        query_string_string = vegan_string + vegetarian_string + gluten_allergy_string + peanut_allergy_string + seafood_allergy_string + dairy_allergy_string + egg_allergy_string + soy_allergy_string + tree_nut_allergy_string + wheat_allergy_string
        puts query_string_string
        puts "--------------------------------------------------- query_string"

        @user.query_string = query_string_string

        @user.save

        respond_to do |format|
          format.json { render json: "hello".to_json}
        end

      end

  end

  def settings

    begin
      decoded_token = JWT.decode user_params[:swipeChefToken], ENV['HMAC_SECRET'], true, { algorithm: 'HS256' }

      user_id = decoded_token[0]['id'].to_i

      @user = User.find(user_id)

      @response = { vegan: @user.vegan,
                    vegetarian: @user.vegetarian,
                    gluten_allergy: @user.gluten_allergy,
                    peanut_allergy: @user.peanut_allergy,
                    seafood_allergy: @user.seafood_allergy,
                    dairy_allergy: @user.dairy_allergy,
                    egg_allergy: @user.egg_allergy,
                    soy_allergy: @user.soy_allergy,
                    tree_nut_allergy: @user.tree_nut_allergy,
                    wheat_allergy: @user.wheat_allergy
                  }

      puts "------------------- RESPONSE USER"
      puts @response
      puts "------------------- RESPONSE USER"



      respond_to do |format|
        format.json { render json: @response.to_json}
      end

    rescue

      respond_to do |format|
        format.json { render json: "400".to_json}
      end

    end


  end


  private

  def user_create_params
    params.permit(:user, :username, :email, :password, :password_confirmation)
  end

  def user_params
    params.permit(
      :id,
      :photo,
      :tagline,
      :swipeChefToken,
      :setting,
      :setting_value
      )
  end

end
