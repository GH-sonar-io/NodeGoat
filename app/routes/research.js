const ResearchDAO = require("../data/research-dao").ResearchDAO;
const needle = require("needle");
const {
    environmentalScripts
} = require("../../config/config");

function ResearchHandler(db) {
    "use strict";

    const researchDAO = new ResearchDAO(db);

    this.displayResearch = (req, res) => {

        if (req.query.symbol) {
            const url = req.query.url + req.query.symbol;
            return needle.get(url, (error, newResponse, body) => {
                let output = "The following is the stock information you requested.\n\n\n\n";
                if (body) {
                    output += body;
                }
                res.set("Content-Type", "text/plain");
                return res.status(200).send(output);
            });
        }

        return res.render("research", {
            environmentalScripts
        });
    };

}

module.exports = ResearchHandler;
