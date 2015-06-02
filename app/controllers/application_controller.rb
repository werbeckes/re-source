class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # before_filter :authorize

  def current_user
    @_current_user ||= User.find_by_id(session[:user_id])
  end
  helper_method :current_user

  def logged_in?
    !!current_user
  end
  helper_method :logged_in?

  def authorize
    redirect_to '/login' unless logged_in?
  end

  def require_user
    render nothing: true unless logged_in?
  end

end
