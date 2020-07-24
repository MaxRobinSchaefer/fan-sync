function checkIfAllEnvironmentVariablesAreSet(envVars) {
    for (const envVar of envVars) {
        if (!process.env[envVar])
            throw new Error(`${envVar} is a required environment variable, please set this!`);
    }
}

module.exports = {
    checkIfAllEnvironmentVariablesAreSet
}