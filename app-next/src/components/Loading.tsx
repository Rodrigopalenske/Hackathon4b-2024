import "./loading.css";

export default function Loading() {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Carregando...</p>
        </div>
    );
}
