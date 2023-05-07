import { TextInput, PasswordInput, Button, Container, SimpleGrid, Grid, Spoiler, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import logo from './Components/cicakman_poster.jpg';

function ViewMovieDetails() {

    return (
        <div>
            <h1>Movie Details</h1>
            <Container my="md">
                <Grid>
                    <Grid.Col span={6}>
                        <img src={logo} alt="Logo" className="logo" width={400} height={600}/>
                        <Text fz="xl" ta="center">Cicak-Man</Text>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide" transitionDuration={0}>
                            Hairi Yatim (Saiful Apek), is a loser who lives in Metrofulus. While working in the lab, he accidentally drinks coffee that has been contaminated by a virus-infected gecko (Virus 266). He soon finds himself doing the most insane things, such as sticking to walls, making chirping cicak noises and adding bugs to his menu. He turns to his best friend and apartment mate, Danny (Yusry Abdul Halim), and begs him to find the reason behind his strange antics.

                            Meanwhile, the people of Metrofulus are constantly being infected by new strains of viruses, and the only cure seems to come only from Professor Klon's (Aznil Nawawi) lab. Suspecting something amiss, Hairi and Danny launch their own investigation and discover that Professor Klon is not only the creator of such viruses, but also has a more sinister plan up his sleeve, backed by his business partners, the Ginger Boys (played by Adlin Aman Ramlie and AC Mizal), who first tend to take revenge on Professor Klon's failed experiment on them; making their senses turn abnormal.

                            Hairi soon makes use of his new-found powers as "Cicakman" when he saves Tania (Fasha Sandha), Professor Klon's secretary from a threatening situation, and also ends up falling for her. However, he finds that his powers are more of a threat to his life, than a gift, and embarks on a mission to bring down Prof. Klon and the Ginger Boys before his time runs out.
                        </Spoiler>
                    </Grid.Col>

                    <Grid.Col span={6}>

                    </Grid.Col>

                </Grid>
            </Container>
        </div>
    );
}

export default ViewMovieDetails;