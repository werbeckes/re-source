module Api
  class SnippetsController < ApplicationController
    before_action :token_authenticate

    def create
      render plain: "HIT THE ROUTE"
    end

    protected

    def token_authenticate
      authenticate_or_request_with_http_token do |token, options|

      end
    end

  end
end