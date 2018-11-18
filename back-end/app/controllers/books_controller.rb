class BooksController < ApplicationController
    def index
    @user_book = current_user.books
    @user_book_recipes = @user_book.map {|book_item| Recipe.find(book_item['recipe_id'])}
    puts @user_book_recipes

    respond_to do |format|
      format.json { render json: @user_book_recipes }
    end
  end
end
