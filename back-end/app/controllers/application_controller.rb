class ApplicationController < ActionController::Base
  require 'rest-client'
  require 'json'



  def current_user
    @current_user = User.find(2)
  end
  helper_method :current_user
end
