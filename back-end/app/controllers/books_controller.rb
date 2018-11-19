class BooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @user_book = current_user.books
    @user_book_recipes = @user_book.map {|book_item| Recipe.find(book_item['recipe_id'])}
    puts @user_book_recipes

    respond_to do |format|
      format.json { render json: @user_book_recipes }
    end
  end

 # CHECK in Fridge we didn't have a to_json, so I didn't put one here ...
  def create
    @book = Book.find_or_create_by(book_params)

    respond_to do |format|
      format.json { render json: @book}
    end
  end

  def destroy
    @book = Book.find_by(book_params)
    @book.destroy
    @message = "Item removed from the book".to_json

    respond_to do |format|
      format.json { render json: @message}
    end

  end

  private

  def book_params
    params.permit(
      :recipe_id,
      :user_id
      )
  end

end
