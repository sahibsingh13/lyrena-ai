import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import { getAvailableModels, getModelDisplayName } from "../../config/OpenRouter";
import "./settingsModal.css";

const SettingsModal = ({ isOpen, onClose }) => {
	const { 
		apiKey, 
		setApiKey, 
		selectedModel, 
		setSelectedModel, 
		username, 
		setUsername 
	} = useContext(Context);
	
	const [tempApiKey, setTempApiKey] = useState(apiKey || "");
	const [tempUsername, setTempUsername] = useState(username || "");
	const [tempModel, setTempModel] = useState(selectedModel || "gpt-3.5-turbo");

	const handleSave = () => {
		// Save to local storage with username hash
		const userHash = btoa(tempUsername || "default-user");
		localStorage.setItem(`lyrena_api_key_${userHash}`, tempApiKey);
		localStorage.setItem(`lyrena_username`, tempUsername);
		localStorage.setItem(`lyrena_model_${userHash}`, tempModel);
		
		// Update context
		setApiKey(tempApiKey);
		setUsername(tempUsername);
		setSelectedModel(tempModel);
		
		onClose();
	};

	const handleCancel = () => {
		setTempApiKey(apiKey || "");
		setTempUsername(username || "");
		setTempModel(selectedModel || "gpt-3.5-turbo");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<h2>Settings</h2>
					<button className="close-btn" onClick={onClose}>×</button>
				</div>
				
				<div className="modal-body">
					<div className="setting-group">
						<label htmlFor="username">Username</label>
						<input
							id="username"
							type="text"
							value={tempUsername}
							onChange={(e) => setTempUsername(e.target.value)}
							placeholder="Enter your username"
							className="setting-input"
						/>
					</div>

					<div className="setting-group">
						<label htmlFor="apiKey">OpenRouter API Key</label>
						<input
							id="apiKey"
							type="password"
							value={tempApiKey}
							onChange={(e) => setTempApiKey(e.target.value)}
							placeholder="Enter your OpenRouter API key"
							className="setting-input"
						/>
						<small className="setting-help">
							Get your API key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer">OpenRouter.ai</a>
						</small>
					</div>

					<div className="setting-group">
						<label htmlFor="model">Default AI Model</label>
						<select
							id="model"
							value={tempModel}
							onChange={(e) => setTempModel(e.target.value)}
							className="setting-select"
						>
							{getAvailableModels().map((modelKey) => (
								<option key={modelKey} value={modelKey}>
									{getModelDisplayName(modelKey)}
								</option>
							))}
						</select>
						<small className="setting-help">
							Choose your preferred AI model for conversations
						</small>
					</div>
				</div>

				<div className="modal-footer">
					<button className="btn-cancel" onClick={handleCancel}>
						Cancel
					</button>
					<button className="btn-save" onClick={handleSave}>
						Save Settings
					</button>
				</div>
			</div>
		</div>
	);
};

export default SettingsModal;