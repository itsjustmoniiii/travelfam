import styles from "../../styles/AuthLayout.module.css";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div className={`flex h-screen ${styles.bgStyle}`}>
        <div className="m-auto bg-slate-50  rounded-md grid lg:grid-cols-2 w-11/12 md:w-5/6 h-4/5 overflow-hidden">
          <div className={`${styles.bgStyle}`}>
            <div className={styles.backgroundImg}></div>
          </div>
          <div className="right flex flex-col justify-evenly">
            <div className="text-center py-10 ">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
