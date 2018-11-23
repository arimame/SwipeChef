class RecipesController < ApplicationController
  skip_before_action :verify_authenticity_token



  def index
    decoded_token = JWT.decode params[:swipeChefToken], "spaghetti", true, { algorithm: 'HS256' }

    user_id = decoded_token[0]['id'].to_i

    @user = User.find(user_id)

    query_settings = @user.query_string


    query = request.original_fullpath[8..-1]
    decoded = URI.decode(query)
    swipe_index = decoded.index('&swipe')

    decoded_no_token = decoded.slice(0,swipe_index)

    puts decoded_no_token

    puts "THE URL BELOW"
    puts "http://api.yummly.com/v1/api/recipes?_app_id=#{ENV['ID']}&_app_key=#{ENV['KEY']}#{decoded_no_token}#{query_settings}"


    puts
    @response = RestClient::Request.execute(
      method: :get,
       url: "http://api.yummly.com/v1/api/recipes?_app_id=#{ENV['ID']}&_app_key=#{ENV['KEY']}#{decoded_no_token}#{query_settings}")

    puts @response

    #  user_id = decoded_token[0]['id'].to_i

      @response = RestClient::Request.execute(
        method: :get,
         url: "http://api.yummly.com/v1/api/recipes?_app_id=#{ENV['ID']}&_app_key=#{ENV['KEY']}&q=pasta&maxResult=2&start=2&requirePictures=true")


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
