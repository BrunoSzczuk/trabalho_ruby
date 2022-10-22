import { useEffect, useState } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Libs
import { Button, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";

// Material Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Internals
import ROUTES from "../../src/config/routes";
import personagemService from "../../src/services/PersonagemService";
import { Container } from "@mui/system";

function personagemList() {
  const { router } = useRouter();
  const [personagems, setpersonagems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deletepersonagem = (personagem) => {
    var accepted = confirm(`Você realmente gostaria de deletar o Personagem: ${personagem.nome}`);
    if (!accepted) return;

    setIsLoading(true);
    personagemService.destroy(personagem.id)
      .then((data) => {
        getpersonagems().then(() => {
          setIsLoading(false);
          toast.success("personagem destroyed com success!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro quando destroying personagem: ${e.message}`);
      });
  };

  const getpersonagems = async () => {
    let data = await personagemService.getAll();
    console.log(data);
    setpersonagems(data);
  };

  useEffect(() => {
    getpersonagems().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <Container fluid>
      <Grid container mt={2}>
        <Grid xs={6}>
          <Typography variant="h4">personagems List</Typography>
        </Grid>
        <Grid xs={6}>
          <p>
            <Link
              href={{
                pathname: ROUTES.personagems.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<DeleteForeverIcon fontSize="small" />}>
                New personagem
              </Button>
            </Link>
          </p>
        </Grid>
        <Grid xs={12}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>nome</th>
                <th>Classe</th>
              </tr>
            </thead>
            <tbody>
              {personagems.map((personagem) => {
                return (
                  <tr key={personagem.id}>
                    <td>{personagem.id}</td>
                    <td>{personagem.nome}</td>
                    <td>{personagem.classe_id}</td>
                    <td>{personagem.created_at}</td>
                    <td>{personagem.published_at}</td>
                    <td>
                      <Link
                        href={{
                          pathname: ROUTES.personagems.show,
                          query: {
                            id: personagem.id,
                          },
                        }}
                      >
                        <Button variant="contained" size="small">
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Link
                        href={{
                          pathname: ROUTES.personagems.edit,
                          query: {
                            id: personagem.id,
                          },
                        }}
                      >
                        <Button variant="contained" color="warning" size="small">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" size="small" onClick={() => deletepersonagem(personagem)}>
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Container>
  );
}

export default personagemList;
