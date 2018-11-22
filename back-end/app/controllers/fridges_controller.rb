class FridgesController < ApplicationController
  skip_before_action :verify_authenticity_token



  def index
    decoded_token = JWT.decode params[:swipeChefToken], "spaghetti", true, { algorithm: 'HS256' }

    if decoded_token

      user_id = decoded_token[0]['id'].to_i

      @user_fridge = User.find(user_id).fridges

      @user_fridge_recipes = @user_fridge.map {|fridge_item| Recipe.find(fridge_item['recipe_id'])}
      puts @user_fridge_recipes

      respond_to do |format|
        format.json { render json: @user_fridge_recipes.to_json }
      end
    else
      respond_to do |format|
        format.json { render json: "register".to_json }
      end
    end
  end

  def create
    decoded_token = JWT.decode params[:swipeChefToken], "spaghetti", true, { algorithm: 'HS256' }

    if decoded_token

      user_id = decoded_token[0]['id'].to_i
      puts user_id

      @fridge = Fridge.find_or_create_by(recipe_id: params[:recipe_id], user_id: user_id)

      respond_to do |format|
        format.json { render json: @fridge }
      end

    else
      respond_to do |format|
        format.json { render json: "register".to_json }
      end
    end
  end

  def destroy
    decoded_token = JWT.decode params[:swipeChefToken], "spaghetti", true, { algorithm: 'HS256' }

    if decoded_token

      user_id = decoded_token[0]['id'].to_i

      @fridge = Fridge.find_or_create_by(user_id: user_id, recipe_id: params[:id])

      @fridge.destroy
      @message = "item removed from fridge".to_json

      respond_to do |format|
        format.json { render json: @message}
      end
    else
      respond_to do |format|
        format.json { render json: "register".to_json }
      end
    end
  end

  private

  def fridge_params
    params.permit(
      :recipe_id,
      :user_id,
      :swipeChefToken
      )
  end

end
