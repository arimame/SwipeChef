class RecipesController < ApplicationController
  skip_before_action :verify_authenticity_token



  def index
    #decoded_token = JWT.decode book_params[:swipeChefToken], "spaghetti", true, { algorithm: 'HS256' }

    #if decoded_token

    query = request.original_fullpath[8..-1]
    decoded = URI.decode(query)
    puts "THE URL BELOW"
    puts "http://api.yummly.com/v1/api/recipes?_app_id=#{ENV['ID']}&_app_key=#{ENV['KEY']}#{decoded}"

    @response = RestClient::Request.execute(
      method: :get,
       url: "http://api.yummly.com/v1/api/recipes?_app_id=#{ENV['ID']}&_app_key=#{ENV['KEY']}#{decoded}")

    puts @response

    #  user_id = decoded_token[0]['id'].to_i

      @response = RestClient::Request.execute(
        method: :get,
         url: "http://api.yummly.com/v1/api/recipes?_app_id=#{ENV['ID']}&_app_key=#{ENV['KEY']}&q=pasta&maxResult=2&start=2&requirePictures=true")


      respond_to do |format|
        format.json { render json: @response }
      end
    #else
    #  respond_to do |format|
    #    format.json { render json: "register".to_json }
    #  end
    #end
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

    @recipe_id = {
      recipe_id: @recipe['id']
    }.to_json

    respond_to do |format|
      format.json { render json: @recipe_id }
    end
  end

  private

  def recipe_params
    params.permit(
      :api_ref,
      :name,
      :image,
      :swipeChefToken
      )
  end

end
