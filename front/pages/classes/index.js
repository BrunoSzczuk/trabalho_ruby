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
import classeService from "../../src/services/ClasseService";
import { Container } from "@mui/system";

function classeList() {
  const { router } = useRouter();
  const [classes, setclasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteclasse = (classe) => {
    var accepted = confirm(`Você realmente gostaria de deletar a classe: ${classe.nome}`);
    if (!accepted) return;

    setIsLoading(true);
    classeService.destroy(classe.id)
      .then((data) => {
        getclasses().then(() => {
          setIsLoading(false);
          toast.success("classe destroyed com success!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro quando destroying classe: ${e.message}`);
      });
  };

  const getclasses = async () => {
    let data = await classeService.getAll();
    console.log(data);
    setclasses(data);
  };

  useEffect(() => {
    getclasses().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <Container fluid>
      <Grid container mt={2}>
        <Grid xs={6}>
            <Typography variant="h4">classes List</Typography>
        </Grid>
        <Grid xs={6}>
          <p>
            <Link
              href={{
                pathname: ROUTES.classes.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<DeleteForeverIcon fontSize="small" />}>
                New classe
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
              </tr>
            </thead>
            <tbody>
              {classes.map((classe) => {
                return (
                  <tr key={classe.id}>
                    <td>{classe.id}</td>
                    <td>{classe.nome}</td>
                    <td>{classe.created_at}</td>
                    <td>{classe.published_at}</td>
                    <td>
                      <Link
                        href={{
                          pathname: ROUTES.classes.show,
                          query: {
                            id: classe.id,
                          },
                        }}
                      >
                        <Button variant="contained" size="small">
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Link
                        href={{
                          pathname: ROUTES.classes.edit,
                          query: {
                            id: classe.id,
                          },
                        }}
                      >
                        <Button variant="contained" color="warning" size="small">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" size="small" onClick={() => deleteclasse(classe)}>
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

export default classeList;
