import { createContext, useState, useEffect } from "react";
import runChat from "../config/OpenRouter";

export const Context = createContext();

const ContextProvider = (props) => {
	const [input, setInput] = useState("");
	const [recentPrompt, setRecentPrompt] = useState("");
	const [prevPrompts, setPrevPrompts] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resultData, setResultData] = useState("");
	
	// New state for settings
	const [username, setUsername] = useState("");
	const [apiKey, setApiKey] = useState("");
	const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
	const [selectedModels, setSelectedModels] = useState(["gpt-3.5-turbo"]);
	const [compareMode, setCompareMode] = useState(false);

	// Load settings from localStorage on component mount
	useEffect(() => {
		const savedUsername = localStorage.getItem("lyrena_username") || "";
		setUsername(savedUsername);
		
		if (savedUsername) {
			const userHash = btoa(savedUsername || "default-user");
			const savedApiKey = localStorage.getItem(`lyrena_api_key_${userHash}`) || "";
			const savedModel = localStorage.getItem(`lyrena_model_${userHash}`) || "gpt-3.5-turbo";
			const savedModels = JSON.parse(localStorage.getItem(`lyrena_models_${userHash}`) || '["gpt-3.5-turbo"]');
			const savedCompareMode = localStorage.getItem(`lyrena_compare_${userHash}`) === 'true';
			setApiKey(savedApiKey);
			setSelectedModel(savedModel);
			setSelectedModels(savedModels);
			setCompareMode(savedCompareMode);
		}
	}, []);

	const delayPara = (index, nextWord) => {
		setTimeout(function () {
			setResultData((prev) => prev + nextWord);
		}, 10 * index);
	};
    const newChat = () =>{
        setLoading(false);
        setShowResults(false)
    }

	const onSent = async (prompt) => {
		setResultData("");
		setLoading(true);
		setShowResults(true);
        let response;
        if(prompt !== undefined){
            response = await runChat(prompt, selectedModel, apiKey);
            setRecentPrompt(prompt)
        }else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(input);
            response=await runChat(input, selectedModel, apiKey);
        }
		
		try {
			
			
			let responseArray = response.split("**");
            let newResponse = "";
			for (let i = 0; i < responseArray.length; i++) {
				if (i === 0 || i % 2 !== 1) {
					newResponse += responseArray[i];
				} else {
					newResponse += "<b>" + responseArray[i] + "</b>";
				}
			}
			let newResponse2 = newResponse.split("*").join("<br/>");
			let newResponseArray = newResponse2.split("");
			for (let i = 0; i < newResponseArray.length; i++) {
				const nextWord = newResponseArray[i];
				delayPara(i, nextWord + "");
			}
		} catch (error) {
			console.error("Error while running chat:", error);
			// Handle error appropriately
		} finally {
			setLoading(false);
			setInput("");
		}
	};

	const contextValue = {
		prevPrompts,
		setPrevPrompts,
		onSent,
		setRecentPrompt,
		recentPrompt,
		input,
		setInput,
		showResults,
		loading,
		resultData,
		newChat,
		username,
		setUsername,
		apiKey,
		setApiKey,
		selectedModel,
		setSelectedModel,
		selectedModels,
		setSelectedModels,
		compareMode,
		setCompareMode,
	};

	return (
		<Context.Provider value={contextValue}>{props.children}</Context.Provider>
	);
};

export default ContextProvider;
