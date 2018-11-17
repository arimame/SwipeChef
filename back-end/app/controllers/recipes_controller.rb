class RecipesController < ApplicationController

  def index
    @response = RestClient::Request.execute(
      method: :get,
       url: "http://api.yummly.com/v1/api/recipes?_app_id=#{ENV['ID']}&_app_key=#{ENV['KEY']}&q=pasta&maxResult=2&start=2&requirePictures=true")
      puts @response

    respond_to do |format|
      format.json { render json: @response }
      end
  end
end
