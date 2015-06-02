class NotesController < ApplicationController
  respond_to :json
  def index
    @notes = Category.find_by(id: params[:category_id]).notes
    render json: @notes.to_a
  end

  # def show
  #   @category = Category.find(params[:id])
  #   render json: @category
  # end

  def create
    @category = Category.find_by_id(params[:category_id])
    @note = @category.notes.new(note_params)
    if @note.save
      render json: @note
    else
      #TODO catch and return errors
    end
  end

  def update
    @note = Note.find_by_id(params[:id])
    @note.update(note_params)
    render nothing: true
  end

  def destroy
    Note.find_by_id(params[:id]).destroy
    render json: " "
  end

  private
    def note_params
      params.require(:note).permit(:title, :synopsis, :code, :public_bool)
    end
end
