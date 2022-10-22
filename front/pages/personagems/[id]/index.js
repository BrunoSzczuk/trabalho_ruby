import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import PersonagemService from "../../../src/services/PersonagemService";

function ShowPersonagem() {
  const router = useRouter()
  const { id } = router.query

  const [personagem, setPersonagem] = useState(null);

  useEffect(() => {
    PersonagemService.getById(id).then((data) => {
      setPersonagem(data)
    })
  }, [id])

  if (!personagem) return `Carregando...`

  return (
    <>
      <p>Exibindo the Personagem: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.personagems.list,
          }}
        >
          <a>Voltar</a>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{personagem.id}</dd>

        <dt>Nome</dt>
        <dd>{personagem.nome}</dd>

        <dt>Classe</dt>
        <dd>{personagem.classe_id}</dd>


        <dt>Created At</dt>
        <dd>{personagem.created_at}</dd>
      </dl>

    </>
  );
}

export default ShowPersonagem;