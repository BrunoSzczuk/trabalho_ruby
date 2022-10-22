import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import ClasseService from "../../../src/services/ClasseService";

function EditClasse() {
  const router = useRouter();
  const { id } = router.query;
  const [classe, setClasse] = useState(null);

  useEffect(() => {
    ClasseService.getById(id).then((data) => {
      setClasse(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateClasse = (classe) => {
    console.log(classe)
    console.log(id)
    ClasseService.update(id, classe).then((data) => {
      router.push(ROUTES.classes.list)
      toast.success(`Classe successfully atualizada!`)
    }).catch((e) => {
      toast.error(`Erro when updating classe: ${e.message}`)
    })
  }

  useEffect(() => {
  }, []);

  if (!classe) return `Carregando...`

  console.log(classe)

  return (
    <>
      <p>Page de edição of Classe: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.classes.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => updateClasse(data))}>
        <div className="field">
          <label>Nome</label>
          <input {...register("nome", { required: true })} defaultValue={classe.nome} />
          {errors.nome && <p>nome is required.</p>}
        </div>


        <input type="submit" />
      </form>
    </>
  );
}

export default EditClasse;
