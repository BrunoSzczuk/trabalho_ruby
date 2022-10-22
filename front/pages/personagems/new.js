import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import PersonagemService from "../../src/services/PersonagemService";
import classeService from "../../src/services/ClasseService";
import ClasseService from "../../src/services/ClasseService";

function NewPersonagem() {
  const router = useRouter()
  const [classes, setClasses] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const insertPersonagem = (personagem) => {
    PersonagemService.create(personagem).then((data) => {
      router.push(ROUTES.personagems.list)
      toast.success(`Personagem successfully criada!`)
    }).catch((e) => console.error(e))
  }

  useEffect(() => {
    classeService.getAll().then((data) => setClasses(data))
  }, []);

  return (
    <>
      <p>Tela de Cadastro de Personagem</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.personagems.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => insertPersonagem(data))}>
        <div className="field">
          <label>Nome</label>
          <input {...register("nome", { required: true })} />
          {errors.nome && <p>nome is necessário.</p>}
        </div>
        <div className="field">
          <label>Classe</label>
          <select {...register("classe_id", { pattern: /\d/ })}>
            <option>Selecione uma Classe</option>
            {
              classes.map((classe) => {
                return <option key={classe.id} value={classe.id}>{classe.nome}</option>
              })
            }
          </select>
          {errors.classe_id && <p>Classe is required.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default NewPersonagem;
