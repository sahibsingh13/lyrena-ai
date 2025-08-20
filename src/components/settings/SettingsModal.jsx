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
		selectedModels,
		setSelectedModels,
		compareMode,
		setCompareMode,
		username, 
		setUsername 
	} = useContext(Context);
	
	const [tempApiKey, setTempApiKey] = useState(apiKey || "");
	const [tempUsername, setTempUsername] = useState(username || "");
	const [tempModel, setTempModel] = useState(selectedModel || "gpt-3.5-turbo");
	const [tempModels, setTempModels] = useState(selectedModels || ["gpt-3.5-turbo"]);
	const [tempCompareMode, setTempCompareMode] = useState(compareMode || false);

	const handleSave = () => {
		// Save to local storage with username hash
		const userHash = btoa(tempUsername || "default-user");
		localStorage.setItem(`lyrena_api_key_${userHash}`, tempApiKey);
		localStorage.setItem(`lyrena_username`, tempUsername);
		localStorage.setItem(`lyrena_model_${userHash}`, tempModel);
		localStorage.setItem(`lyrena_models_${userHash}`, JSON.stringify(tempModels));
		localStorage.setItem(`lyrena_compare_${userHash}`, tempCompareMode.toString());
		
		// Update context
		setApiKey(tempApiKey);
		setUsername(tempUsername);
		setSelectedModel(tempModel);
		setSelectedModels(tempModels);
		setCompareMode(tempCompareMode);
		
		onClose();
	};

	const handleCancel = () => {
		setTempApiKey(apiKey || "");
		setTempUsername(username || "");
		setTempModel(selectedModel || "gpt-3.5-turbo");
		setTempModels(selectedModels || ["gpt-3.5-turbo"]);
		setTempCompareMode(compareMode || false);
		onClose();
	};

	const handleModelToggle = (modelKey) => {
		if (tempModels.includes(modelKey)) {
			if (tempModels.length > 1) {
				setTempModels(tempModels.filter(m => m !== modelKey));
			}
		} else {
			setTempModels([...tempModels, modelKey]);
		}
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
							Choose your preferred AI model for single conversations
						</small>
					</div>

					<div className="setting-group">
						<div className="setting-header">
							<label>Model Comparison Mode</label>
							<div className="toggle-switch">
								<input
									type="checkbox"
									id="compareMode"
									checked={tempCompareMode}
									onChange={(e) => setTempCompareMode(e.target.checked)}
								/>
								<label htmlFor="compareMode" className="toggle-label"></label>
							</div>
						</div>
						<small className="setting-help">
							Compare responses from multiple AI models side by side
						</small>
						
						{tempCompareMode && (
							<div className="model-selection">
								<p className="model-selection-title">Select Models to Compare:</p>
								<div className="model-grid">
									{getAvailableModels().map((modelKey) => (
										<div
											key={modelKey}
											className={`model-item ${tempModels.includes(modelKey) ? 'selected' : ''}`}
											onClick={() => handleModelToggle(modelKey)}
										>
											<div className="model-checkbox">
												{tempModels.includes(modelKey) && '✓'}
											</div>
											<span className="model-name">{getModelDisplayName(modelKey)}</span>
										</div>
									))}
								</div>
								<small className="setting-help">
									Select 2-4 models for optimal comparison experience
								</small>
							</div>
						)}
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