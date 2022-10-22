import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import ClasseService from "../../src/services/ClasseService";

function NewClasse() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const insertClasse = (classe) => {
    ClasseService.create(classe).then((data) => {
      router.push(ROUTES.classes.list)
      toast.success(`Classe successfully criada!`)
    }).catch((e) => console.error(e))
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <p>Tela de Cadastro de Classe</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.classes.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => insertClasse(data))}>
        <div className="field">
          <label>Nome</label>
          <input {...register("nome", { required: true })} />
          {errors.nome && <p>nome is necessário.</p>}
        </div>

    
        <input type="submit" />
      </form>
    </>
  );
}

export default NewClasse;
