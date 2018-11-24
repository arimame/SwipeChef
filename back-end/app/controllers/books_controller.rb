class BooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index

    begin

      decoded_token = JWT.decode book_params[:swipeChefToken], "spaghetti", true, { algorithm: 'HS256' }

      user_id = decoded_token[0]['id'].to_i

      if params[:usernameToVisit].length >= 1
        @user = User.find_by username: params[:usernameToVisit]

        following_id = @user['id']

        are_friends = Friend.exists?(user_id: user_id, following_id: following_id)

      else
        @user = User.find(user_id)

        are_friends = nil

      end


      @user_book = @user.books
      user_book_recipes = @user_book.map {|book_item| Recipe.find(book_item['recipe_id'])}

      user_book_response = {user_book_recipes: user_book_recipes, are_friends: are_friends}


      respond_to do |format|
        format.json { render json: user_book_response.to_json }
      end
    rescue
      respond_to do |format|
        format.json { render json: "INCORRECT TOKEN ".to_json }
      end

    end

  end

 # CHECK in Fridge we didn't have a to_json, so I didn't put one here ...
  def create
    decoded_token = JWT.decode book_params[:swipeChefToken], "spaghetti", true, { algorithm: 'HS256' }

    if decoded_token

      user_id = decoded_token[0]['id'].to_i

      @book = Book.find_or_create_by(user_id: user_id, recipe_id: params[:recipe_id])

      respond_to do |format|
        format.json { render json: @book}
      end
    end
  end

  def destroy
    decoded_token = JWT.decode params[:swipeChefToken], "spaghetti", true, { algorithm: 'HS256' }

    if decoded_token

      user_id = decoded_token[0]['id'].to_i

      @book = Book.find_by(user_id: user_id, recipe_id: params[:id])
      @book.destroy
      @message = "Item removed from the book".to_json

      respond_to do |format|
        format.json { render json: @message}
      end
    end
  end

  private

  def book_params
    params.permit(
      :recipe_id,
      :user_id,
      :swipeChefToken
      )
  end

end
