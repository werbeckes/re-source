class UsersController < ApplicationController

  def create
    user = User.new(user_params)

    if user.save
      session[:user_id] = user.id
      redirect_to "/users/#{user.id}"
    else
      @errors = "Sorry! Something went wrong. Please try again."
      render 'users/new'
    end
  end

  def checkOwner
    if logged_in? && params[:id].to_i == current_user.id
      render json: {isOwner: true}
    else
      render json: {isOwner: false}
    end
  end


private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :email, :password, :password_confirmation)
  end

end #End User Controller
