interface ErrorDisplayProps {
    error: string;
    title?: string;
    onRetry?: () => void;
}

function ErrorDisplay({error, title = "Error", onRetry}: ErrorDisplayProps) {
    return (
        <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">{title}</h4>
            <p>{error}</p>
            {onRetry && (
                <>
                    <hr/>
                    <button className="btn btn-outline-danger" onClick={onRetry}>
                        Try Again
                    </button>
                </>
            )}
        </div>
    );
}

export default ErrorDisplay;