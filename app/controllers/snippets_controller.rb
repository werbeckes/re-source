class SnippetsController < ApplicationController
    before_action :token_authenticate, except: [:login]
    #skip because we have no snippet form
    skip_before_filter :verify_authenticity_token
    def login
      puts "HIT LOGIN ROUTE"
      user = User.find_by_email(params[:email])
      if user && user.authenticate(params[:password])
        render json: {username: user.username, auth_token: user.auth_token}
      else
        render plain: "INVALID CREDENTIALS", status: 401
      end
    end

    def index
      puts "HIT INDEX ROUTE"
      render plain: "HIT INDEX ROUTE"
    end

    def create
      render plain: "HIT CREATE ROUTE"
    end

    protected

    def token_authenticate
      authenticate_or_request_with_http_token do |token, options|
        User.find_by(auth_token: token)
      end
    end

end