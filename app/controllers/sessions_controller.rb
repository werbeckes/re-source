class SessionsController < ApplicationController

  def new
    if logged_in?
      redirect_to "/users/#{current_user.id}"
    end
  end

  def create
    user = User.find_by_email(params[:email])
    # puts "Found User: #{user}"
    # puts "User entered password: #{params[:password][0]}"
    if user && user.authenticate(params[:password][0])
      session[:user_id] = user.id
      redirect_to "/users/#{user.id}"
    else
      @errors = "Sorry, something went wrong. Please try again."
      render 'sessions/new'
    end
  end

  def destroy
    session.clear
    redirect_to '/login'
  end

end #End Sessions Controller
