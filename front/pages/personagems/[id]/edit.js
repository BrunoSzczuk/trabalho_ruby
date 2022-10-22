import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import PersonagemService from "../../../src/services/PersonagemService";
import classeService from "../../../src/services/ClasseService";
function EditPersonagem() {
  const router = useRouter();
  const [classes, setClasses] = useState([]);
  const { id } = router.query;
  const [personagem, setPersonagem] = useState(null);

  useEffect(() => {
    PersonagemService.getById(id).then((data) => {
      setPersonagem(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updatePersonagem = (personagem) => {
    console.log(personagem)
    console.log(id)
    PersonagemService.update(id, personagem).then((data) => {
      router.push(ROUTES.personagems.list)
      toast.success(`Personagem successfully atualizada!`)
    }).catch((e) => {
      toast.error(`Erro when updating personagem: ${e.message}`)
    })
  }

  useEffect(() => {
    classeService.getAll().then((data) => setClasses(data))
  }, []);

  if (!personagem) return `Carregando...`

  console.log(personagem)

  return (
    <>
      <p>Page de edição of Personagem: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.personagems.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => updatePersonagem(data))}>
        <div className="field">
          <label>Nome</label>
          <input {...register("nome", { required: true })} defaultValue={personagem.nome} />
          {errors.nome && <p>nome is required.</p>}
        </div>
        <div className="field">
          <label>Classe</label>
          <select {...register("classe_id", { pattern: /\d/ })} defaultValue={personagem.classe_id}>
            <option>Select Classe</option>
            {classes.map((classe) => {
              return (
                <option key={classe.id} value={classe.id}>
                  {classe.nome}
                </option>
              );
            })}
          </select>
          {errors.classe_id && <p>Classe is required.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default EditPersonagem;
