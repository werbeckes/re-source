class SessionsController < ApplicationController

  def new
    if logged_in?
      redirect_to '/home'
    end
  end

  def create
    user = User.find_by_email(params[:email])
    # puts "Found User: #{user}"
    # puts "User entered password: #{params[:password][0]}"
    if user && user.authenticate(params[:password][0])
      session[:user_id] = user.id
      redirect_to '/home'
    else
      render '/login'
    end
  end

  def destroy
    session.clear
    redirect_to '/login'
  end

end #End Sessions Controller
