class ApplicationController < ActionController::Base
  require 'rest-client'
  require 'json'
  require 'jwt'


  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user



    @current_user ||= User.find( session[:user_id]) if session[:user_id]
  end
  helper_method :current_user


  #QUESTION - HOW TO HANDLE authorize
  def authorize
    unless current_user
      respond_to do |format|
        format.json { render json: "YOU NOT LOGGED IN".to_json}
      end and return
    end
  end
end
