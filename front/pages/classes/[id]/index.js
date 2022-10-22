import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import ClasseService from "../../../src/services/ClasseService";

function ShowClasse() {
  const router = useRouter()
  const { id } = router.query

  const [classe, setClasse] = useState(null);

  useEffect(() => {
    ClasseService.getById(id).then((data) => {
      setClasse(data)
    })
  }, [id])

  if (!classe) return `Carregando...`

  return (
    <>
      <p>Exibindo the Classe: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.classes.list,
          }}
        >
          <a>Voltar</a>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{classe.id}</dd>

        <dt>Nome</dt>
        <dd>{classe.nome}</dd>

    
        <dt>Created At</dt>
        <dd>{classe.created_at}</dd>
      </dl>

    </>
  );
}

export default ShowClasse;