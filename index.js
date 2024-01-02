const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const context = github.context;
    const token = core.getInput("token");
    const keepv = core.getInput("keepv");
    const octokit = github.getOctokit(token);

    try {
        const release = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
            owner: context.repo.owner,
            repo: context.repo.repo,
            headers: {
            'X-GitHub-Api-Version': '2022-11-28'
            }
            });
        
            let output = release.data.tag_name;
            if (keepv === "false") {
                output = output.replace("v", "");
            }

            core.setOutput("release", output);
        
    } catch(error) {
        console.log(error.status)
        core.setOutput("release", "");
    }
    
}

run();