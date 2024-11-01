"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./page.module.css";
import api from "../../../services/api";

// import { login } from "../../../../mocks";

function Login() {
   const router = useRouter();

   const [login, setLogin] = useState("");
   const [senha, setSenha] = useState("");

   function handleSubmit(event) {
      event.preventDefault();
      logar();
   }

   async function logar(event) {
      try {
         const dados = {
            usu_email: login,
            usu_senha: senha,
         };

         const response = await api.post("/usuarios/login", dados);

         if (response.data.sucesso == true) {
            const usuario = response.data.dados;
            const objLogado = {
               id: usuario.usu_id,
               nome: usuario.usu_nome,
               acesso: usuario.usu_adm,
            };
            // signin(JSON.stringify(objLogado));
            localStorage.clear();
            localStorage.setItem("user", JSON.stringify(objLogado));
            router.push("/"); // é possível direcionar de acordo com a situação
         } else {
            alert(
               "Erro: " +
                  error.response.data.mensagem +
                  "\n" +
                  error.response.data.dados
            );
         }
      } catch (error) {
         if (error.response) {
            alert(
               error.response.data.mensagem + "\n" + error.response.data.dados
            );
         } else {
            alert(error);
         }
      }
   }
   return (
      <div className={styles.LoginContainer}>
         {/* <div className={styles.LoginContent}> */}

         <div className={styles.LoginAcess}>
            <div className={styles.LoginForm}>
               <Link href={'/usuarios/cadastro'} className={styles.ButtonCadastro}>
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
                        type="password"
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

// trocar botão criar conta por um link