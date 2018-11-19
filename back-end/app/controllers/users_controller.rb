class UsersController < ApplicationController
  def show
    @user = User.find_by(user_params)
    @userResponse = {
      username: @user.username,
      photo: @user.photo,
      tagline: @user.tagline
    }

    respond_to do |format|
      format.json { render json: @userResponse}
    end

  end

  private

  def user_params
    params.permit(
      :id
      )
  end

end
