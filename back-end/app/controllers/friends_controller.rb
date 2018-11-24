class FriendsController < ApplicationController
  skip_before_action :verify_authenticity_token


  def show
    begin
      decoded_token = JWT.decode params[:swipeChefToken], ENV['HMAC_SECRET'], true, { algorithm: 'HS256' }

      current_user_id = decoded_token[0]['id'].to_i

      friends_list = Friend.where({user_id: current_user_id})


      puts friends_list
      puts "--------------- friends list"
      friends_details = friends_list.map {|friend| User.find(friend.following_id).attributes.slice('username', 'tagline', 'photo')}

      puts friends_details
      puts "---------------- friends details"


      respond_to do |format|
        format.json { render json: friends_details.to_json}
      end
    rescue
      respond_to do |format|
        format.json { render json: "400 ERROR - Friend List failure".to_json.html_safe}
      end
    end

  end




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

  def add
    begin
      decoded_token = JWT.decode params[:swipeChefToken], ENV['HMAC_SECRET'], true, { algorithm: 'HS256' }

      current_user_id = decoded_token[0]['id'].to_i

      user_to_follow = User.find_by(username: params[:usernameToVisit])

      user_to_follow_id = user_to_follow['id']

      friend = Friend.create(user_id: current_user_id, following_id: user_to_follow_id)

      respond_to do |format|
        format.json { render json: "200 - Friend Added!".to_json}
      end

    rescue
      respond_to do |format|
        format.json { render json: "400 -  Friend Not Added!".to_json}
      end

    end

  end

  def destroy

    begin
      decoded_token = JWT.decode params[:swipeChefToken], ENV['HMAC_SECRET'], true, { algorithm: 'HS256' }

      current_user_id = decoded_token[0]['id'].to_i

      user_to_unfollow = User.find_by(username: params[:usernameToVisit])

      puts user_to_unfollow

      user_to_unfollow_id = user_to_unfollow['id']

      friend_to_destroy = Friend.find_by(user_id: current_user_id, following_id: user_to_unfollow_id)

      friend_to_destroy.destroy

      respond_to do |format|
        format.json { render json: "200 - Friend Removed!".to_json}
      end

    rescue

      respond_to do |format|
        format.json { render json: "400 - Friend Not Removed".to_json}
      end

    end
  end

end
