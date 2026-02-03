const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const { token } = require("./config.json");

const CLIENT_ID = "1467355895527899227";
const GUILD_ID = "1466883282615668942";

const commands = [
  new SlashCommandBuilder()
    .setName("painel")
    .setDescription("Abrir painel de registro")
    .toJSON()
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("⏳ Registrando comandos...");
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log("✅ Comando /painel registrado com sucesso!");
  } catch (error) {
    console.error(error);
  }
})();
