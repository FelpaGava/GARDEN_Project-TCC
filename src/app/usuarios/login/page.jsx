"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./page.module.css";
import api from "../../../services/api";
import { UserContext } from "../../../../context/userContext";

function Login() {
   const { login_psicologo, error } = useContext(UserContext);
   const router = useRouter();

   const [login, setLogin] = useState("");
   const [senha, setSenha] = useState("");
   const [senhaVisivel, setSenhaVisivel] = useState(false);

   const toggleSenhaVisivel = () => {
      setSenhaVisivel((prevState) => !prevState);
   };

   async function handleSubmit(event) {
      event.preventDefault();

      // Verificação se os campos estão preenchidos
      if (!login || !senha) {
         alert("Por favor, preencha todos os campos.");
         return;
      }

      // Chama a função para realizar o login
      const is_loggin = await login_psicologo(login, senha);
      if (is_loggin) router.push("/system");
   }

   async function logar() {
      try {
         const dados = {
            usu_email: login,
            usu_senha: senha,
         };

         const response = await api.post("/usuarios/login", dados);

         if (response.data.sucesso === true) {
            const usuario = response.data.dados;
            const objLogado = {
               id: usuario.usu_id,
               nome: usuario.usu_nome,
               acesso: usuario.usu_adm,
            };

            localStorage.clear();
            localStorage.setItem("user", JSON.stringify(objLogado));
            router.push("/system");
         } else {
            alert("Erro: " + response.data.mensagem);
         }
      } catch (error) {
         if (error.response) {
            alert(
               error.response.data.mensagem + "\n" + error.response.data.dados
            );
         } else {
            alert("Erro inesperado. Tente novamente mais tarde.");
         }
      }
   }

   return (
      <div className={styles.LoginContainer}>
         <div className={styles.LoginAcess}>
            <div className={styles.LoginForm}>
               <Link
                  href="/usuarios/cadastro"
                  className={styles.ButtonCadastro}
               >
                  CRIAR CONTA
               </Link>

               <div className={styles.Titulo}>
                  <label htmlFor="nomeProjeto">GARDEN</label>
                  <label htmlFor="Acesse" className={styles.AcesseSuaConta}>
                     Acesse sua conta:
                  </label>
               </div>

               <form id="form" className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.FormGroup}>
                     <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        onChange={(v) => setLogin(v.target.value)}
                        value={login}
                        className={styles.InputField}
                     />
                     <Image
                        src="/Icones/Usuario.svg"
                        width={25}
                        height={25}
                        alt="Icone Usuário"
                        className={styles.Icons}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        type={senhaVisivel ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Senha"
                        onChange={(v) => setSenha(v.target.value)}
                        value={senha}
                        className={styles.InputField}
                     />

                     <Image
                        src="/Icones/OcultaSenha.svg"
                        width={25}
                        height={25}
                        onClick={toggleSenhaVisivel}
                        alt="Icone Senha"
                        className={styles.Icons}
                     />
                  </div>

                  <label
                     htmlFor="Esqueceu sua senha?"
                     className={styles.EsqueceuSuaSenha}
                  >
                     Esqueceu sua senha?
                  </label>

                  <button type="submit" className={styles.SubmitButton}>
                     ENTRAR
                  </button>
               </form>
               {error && <p>{error}</p>}
            </div>
         </div>

         <div className={styles.containerButton}></div>

         <div>
            <Image
               src="/images/ImageLogin.png"
               width={2880}
               height={2048}
               alt="Imagem"
               className={styles.BackgroundImageLogin}
            />
         </div>
      </div>
   );
}

export default Login;
