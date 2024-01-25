import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
    // Здесь вы можете отправить ошибку на сервер или выполнить другие действия
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Что-то пошло не так. Пожалуйста, перезагрузите страницу или попробуйте позже.</p>
          <p>Error details: {this.state.error.toString()}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
// !----------------------------------------------------------------
//<ErrorBoundary fallback={<div>Что-то пошло не так</div>}></ErrorBoundary>

// import React, { Component } from "react";

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     console.log('!!!', props)
//     // Инициализируем начальное состояние ошибки
//     this.state = { hasError: false, error: null };
//   }

//   // Если произошла ошибка, устанавливаем состояние в true и сохраняем ошибку
//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     // Отправляем ошибку куда-либо здесь
//     console.log('!!!!!');
//     console.log(error, errorInfo);
//   }
  
//   render() {
//     // Если произошла ошибка, возвращаем компонент-запасной
//     if (this.state.hasError) {
//       return this.props.fallback;
//     }

//     return this.props.children;
//   }

// }

// export default ErrorBoundary;
// !----------------------------------------------------------------