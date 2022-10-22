require "test_helper"

class PersonagemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @personagem = personagems(:one)
  end

  test "should get index" do
    get personagems_url, as: :json
    assert_response :success
  end

  test "should create personagem" do
    assert_difference("Personagem.count") do
      post personagems_url, params: { personagem: { nome: @personagem.nome } }, as: :json
    end

    assert_response :created
  end

  test "should show personagem" do
    get personagem_url(@personagem), as: :json
    assert_response :success
  end

  test "should update personagem" do
    patch personagem_url(@personagem), params: { personagem: { nome: @personagem.nome } }, as: :json
    assert_response :success
  end

  test "should destroy personagem" do
    assert_difference("Personagem.count", -1) do
      delete personagem_url(@personagem), as: :json
    end

    assert_response :no_content
  end
end
