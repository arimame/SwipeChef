class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new

  end


  def create
    user = User.new(user_create_params)
    if user.save

      payload = {id: user.id.to_s}

      token = JWT.encode payload, "spaghetti", 'HS256'


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

      user = User.find(user_id)

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
    decoded_token = JWT.decode user_params[:swipeChefToken], ENV['HMAC_SECRET'], true, { algorithm: 'HS256' }

    if decoded_token

      user_id = decoded_token[0]['id'].to_i

      @user = User.find(user_id)

      @userResponse = {
        username: @user.username,
        photo: @user.photo,
        tagline: @user.tagline
      }
      puts @userResponse
      puts "----------------------------user Response Photo"

      respond_to do |format|
        format.json { render json: @userResponse}
      end
    else
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
        name = params[:photo].original_filename #params[:photo][:file].original_filename
        path = File.join("public", "images", name)
        File.open(path, "wb") { |f| f.write(params[:photo].read) }

        @user = User.find(user_id)
        @user.photo = "images/#{params[:photo].original_filename}"
        @user.save
      end

      if user_params[:tagline]
        @user = User.find(user_id)
        @user.tagline = user_params[:tagline]
        @user.save

      end

    respond_to do |format|
      format.json { render json: "hello".to_json}
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
      :swipeChefToken
      )
  end

end
