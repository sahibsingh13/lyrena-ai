import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
const Main = ({ mobileMenuOpen, setMobileMenuOpen }) => {
	const {
		onSent,
		recentPrompt,
		showResults,
		loading,
		resultData,
		setInput,
		input,
		username,
		selectedModel,
		apiKey,
	} = useContext(Context);

    const handleCardClick = (promptText) => {
			setInput(promptText);
		};
	return (
		<div className="main">
			<div className="nav">
				<div className="nav-left">
					<button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
						<img src={assets.menu_icon} alt="Menu" />
					</button>
					<p>Lyrena AI</p>
				</div>
				<div className="nav-right">
					{username && apiKey && <span className="nav-username">👋 {username}</span>}
					{selectedModel && apiKey && <span className="nav-model">🤖 {selectedModel.toUpperCase()}</span>}
				</div>
			</div>
			<div className="main-container">
				{!showResults ? (
					<>
						<div className="greet">
							<p>
								<span>Hello{username ? `, ${username}` : ''} 👋</span>
							</p>
							<p>How can I help you today?</p>
							{!apiKey && (
								<div className="setup-message">
									<p>🔧 Click the settings icon in the sidebar to configure your OpenRouter API key and start chatting!</p>
								</div>
							)}
						</div>
					</>
				) : (
					<div className="result">
						<div className="result-title">
							<div className="user-message-avatar">
								{username ? username.charAt(0).toUpperCase() : 'U'}
							</div>
							<p>{recentPrompt}</p>
						</div>
						<div className="result-data">
							<img src={assets.ai_icon} alt="Lyrena AI" />
							{loading ? (
								<div className="loader">
									<hr />
									<hr />
									<hr />
								</div>
							) : (
								<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
							)}
						</div>
					</div>
				)}

				<div className="main-bottom">
					<div className="search-box">
						<input
							onChange={(e) => {
								setInput(e.target.value);
							}}
							value={input}
							type="text"
							placeholder="Enter the Prompt Here"
						/>
						<div>
							<img src={assets.gallery_icon} alt="" />
							<img src={assets.mic_icon} alt="" />
							<img
								src={assets.send_icon}
								alt=""
								onClick={() => {
									onSent();
								}}
							/>
						</div>
					</div>
					<div className="bottom-info">
						<p>
							Lyrena AI may display inaccurate info, including about people, so
							double-check its responses. Your privacy & Lyrena AI Apps
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
