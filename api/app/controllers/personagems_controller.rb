class PersonagemsController < ApplicationController
  before_action :set_personagem, only: %i[ show update destroy ]

  # GET /personagems
  def index
    @personagems = Personagem.all

    render json: @personagems
  end

  # GET /personagems/1
  def show
    render json: @personagem
  end

  # POST /personagems
  def create
    @personagem = Personagem.new(personagem_params)

    if @personagem.save
      render json: @personagem, status: :created, location: @personagem
    else
      render json: @personagem.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /personagems/1
  def update
    if @personagem.update(personagem_params)
      render json: @personagem
    else
      render json: @personagem.errors, status: :unprocessable_entity
    end
  end

  # DELETE /personagems/1
  def destroy
    @personagem.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_personagem
    @personagem = Personagem.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def personagem_params
    params.require(:personagem).permit(:nome, :classe_id)
  end
end
