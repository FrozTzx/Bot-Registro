const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  InteractionType
} = require("discord.js");

// 🔐 IMPORTA O TOKEN DO config.json
const { token } = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// ✅ EVENTO READY (SEM WARNING)
client.once("clientReady", () => {
  console.log("✅ Bot online");
});

// 🔄 INTERAÇÕES
client.on("interactionCreate", async (interaction) => {

  // /painel
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "painel") {

      const botao = new ButtonBuilder()
        .setCustomId("abrir_registro")
        .setLabel("📋 Registrar")
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder().addComponents(botao);

      await interaction.reply({
        content: "Clique no botão abaixo para se registrar:",
        components: [row]
      });
    }
  }

  // Botão
  if (interaction.isButton()) {
    if (interaction.customId === "abrir_registro") {

      const modal = new ModalBuilder()
        .setCustomId("setagem_registro")
        .setTitle("Registro");

      const nome = new TextInputBuilder()
        .setCustomId("nome")
        .setLabel("Nome")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const id = new TextInputBuilder()
        .setCustomId("id")
        .setLabel("ID")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      modal.addComponents(
        new ActionRowBuilder().addComponents(nome),
        new ActionRowBuilder().addComponents(id)
      );

      await interaction.showModal(modal);
    }
  }

  // Modal submit
  if (interaction.type === InteractionType.ModalSubmit) {
    if (interaction.customId === "setagem_registro") {

      const nome = interaction.fields.getTextInputValue("nome");
      const id = interaction.fields.getTextInputValue("id");

      const novoNick = `${nome} | ${id}`;

      try {
        await interaction.member.setNickname(novoNick);
        await interaction.reply({
          content: `✅ Registro concluído!\nApelido alterado para **${novoNick}**`,
          flags: 64
        });
      } catch (err) {
        await interaction.reply({
          content: "❌ Erro ao mudar apelido (permissão ou hierarquia).",
          flags: 64
        });
      }
    }
  }
});

// ▶️ LIGA O BOT
client.login(token);
