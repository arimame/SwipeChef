class RecipesController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    query = request.original_fullpath[8..-1]
    decoded = URI.decode(query)
    puts "THE URL BELOW"
    puts "http://api.yummly.com/v1/api/recipes?_app_id=#{ENV['ID']}&_app_key=#{ENV['KEY']}#{decoded}"

    @response = RestClient::Request.execute(
      method: :get,
       url: "http://api.yummly.com/v1/api/recipes?_app_id=#{ENV['ID']}&_app_key=#{ENV['KEY']}#{decoded}")

    puts @response

    respond_to do |format|
      format.json { render json: @response }
    end
  end

  def show
    @recipe_id = params[:id]
    @response = RestClient::Request.execute(
      method: :get,
      url: "http://api.yummly.com/v1/api/recipe/#{@recipe_id}?_app_id=#{ENV['ID']}&_app_key=#{ENV['KEY']}")


   respond_to do |format|
      format.json { render json: @response }
    end
  end 

  def create
    @recipe = Recipe.find_or_create_by(recipe_params)

    @recipe_user_ids = {
      recipe_id: @recipe['id'],
      user_id: current_user['id']
    }.to_json

    respond_to do |format|
      format.json { render json: @recipe_user_ids }
    end
  end

  private

  def recipe_params
    params.permit(
      :api_ref,
      :name,
      :image
      )
  end

end
