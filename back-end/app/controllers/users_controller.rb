class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new

  end


  def create
    user = User.new(user_create_params)
    if user.save

      payload = user.id

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



  def show
    @user = User.find_by(user_params)
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
  end

  def update
    #@user_params = user_params

    if user_params[:photo]
      name = params[:photo].original_filename #params[:photo][:file].original_filename
      path = File.join("public", "images", name)
      File.open(path, "wb") { |f| f.write(params[:photo].read) }

      @user = User.find(user_params[:id])
      @user.photo = "images/#{params[:photo].original_filename}"
      @user.save
    end

    if user_params[:tagline]
      @user = User.find(user_params[:id])
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
      :tagline
      )
  end

end
