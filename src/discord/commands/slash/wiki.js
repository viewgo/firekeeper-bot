const { getUserEmbed, getLedgerEmbed } = require("../../../tools/index");
const _ = require("lodash");
const { findOneUser, findUsers } = require("../../../server/services");
const { SlashCommandBuilder } = require("@discordjs/builders");
const rp = require("request-promise");
const cheerio = require("cheerio");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wiki")
    .setDescription("Look up Elden Ring information")
    .addStringOption((option) =>
      option
        .setName("term")
        .setDescription("The term to look up")
        .setRequired(true)
    ),
  execute: async (interaction) => {
    // const target = await interaction.options.getMember("target");

    const target = await interaction.options.getString("term");
    const term = target.replace(/ /g, "+");

    const baseUrl = "https://eldenring.wiki.fextralife.com/";
    const url = "https://eldenring.wiki.fextralife.com/" + term;
    const obj = {};

    console.log(url);

    rp(url)
      .then(function (html) {
        //success!
        console.log("SUCCESS!");
        const $ = cheerio.load(html);

        obj.url = url;
        obj.name = $(
          "#infobox > div > table > tbody > tr:nth-child(1) > th > h2",
          html
        ).text();

        if (!obj.name) throw new Error();

        obj.description = $(
          "#wiki-content-block > p:nth-child(2)",
          html
        ).text();
        obj.flavor = $(
          "#wiki-content-block > div.lineleft > p > em",
          html
        ).html();

        obj.img = $("#infobox", html).find("img").attr("src");

        const embed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle(obj.name || "")
          .setURL(obj.url)
          .setDescription(obj.description);

        if (obj.img) {
          embed.setImage(baseUrl + obj.img);
        }

        if (obj.flavor) {
          obj.flavor = obj.flavor.replace(/<br>/g, "\n");

          embed.addFields(
            // { name: "\u200B", value: "\u200B" },
            { name: "\u200B", value: "*" + obj.flavor + "*", inline: true }
          );
        }

        interaction.reply({
          content: "hello",
          embeds: [embed],
          ephemeral: false,
        });
      })
      .catch(function (err) {
        interaction.reply({
          content: "Could not find wiki page.",
          ephemeral: true,
        });
      });
  },
};
