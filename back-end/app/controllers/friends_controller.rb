class FriendsController < ApplicationController

  def search
    begin
      decoded_token = JWT.decode params[:swipeChefToken], ENV['HMAC_SECRET'], true, { algorithm: 'HS256' }

      usernames = User.pluck(:username)
      puts usernames
      puts "usernames----------------------------------"


      respond_to do |format|
        format.json { render json: usernames.to_json}
      end
    rescue
      respond_to do |format|
        format.json { render json: "400 ERROR - Wrong_Token".to_json}
      end
    end

  end

end
