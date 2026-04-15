// import { useState } from "react";
// import CustomModal from "./CustomModal";
// import CustomInput from "./locations/CustomInput";

// const AddModal = ({ isOpen, onClose, projects = [], onSubmit }) => {
//   const [searchedKey, setSearchedKey] = useState("");
//   const [selectedProjects, setSelectedProjects] = useState([]);

//   const filteredProjects = projects.filter((project) =>
//     project.name.toLowerCase().includes(searchedKey.toLowerCase()),
//   );

//   const handleSelectProject = (project) => {
//     setSelectedProjects((prev) => {
//       const exists = prev.find((p) => p.id === project.id);

//       if (exists) {
//         return prev.filter((p) => p.id !== project.id);
//       } else {
//         return [...prev, project];
//       }
//     });
//   };

//   const handleSubmit = () => {
//     if (onSubmit) {
//       onSubmit(selectedProjects);
//     }
//     onClose();
//   };

//   const cards =
//     projects.length === 0 ? (
//       <p>لا توجد مشاريع</p>
//     ) : filteredProjects.length > 0 ? (
//       filteredProjects.map((project) => (
//         <div
//           key={project.id}
//           onClick={() => handleSelectProject(project)}
//           className={`project-card ${
//             selectedProjects.find((p) => p.id === project.id) ? "selected" : ""
//           }`}
//         >
//           <h4>{project.name}</h4>
//           <p>{project.location}</p>
//         </div>
//       ))
//     ) : (
//       <p>لا توجد نتائج</p>
//     );

//   return (
//     <CustomModal
//       isOpen={isOpen}
//       setIsOpen={onClose}
//       modalTitle="إضافة مشاريع"
//       submitBtnTitle="إضافة"
//       onSubmit={handleSubmit}
//       styles={{ width: "600px" }}
//     >
//       <CustomInput
//         inputType="input"
//         label="ابحث عن مشاريع"
//         value={searchedKey}
//         setValue={setSearchedKey}
//       />

//       <div className="project-section">
//         <h3>اختر المشاريع</h3>
//         <div className="cards-holder">{cards}</div>
//       </div>
//     </CustomModal>
//   );
// };

// export default AddModal;
import { useState } from "react";
import CustomModal from "./CustomModal";
import CustomInput from "./locations/CustomInput";

const AddModal = ({ isOpen, onClose, projects = [], onSubmit }) => {
  const [searchedKey, setSearchedKey] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchedKey.toLowerCase()),
  );

  const handleSelectProject = (project) => {
    setSelectedProjects((prev) => {
      const exists = prev.find((p) => p.id === project.id);

      if (exists) {
        return prev.filter((p) => p.id !== project.id);
      } else {
        return [...prev, project];
      }
    });
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(selectedProjects);
    }
    onClose();
  };

  const cards =
    projects.length === 0 ? (
      <p>لا توجد مشاريع</p>
    ) : filteredProjects.length > 0 ? (
      filteredProjects.map((project) => (
        <div
          key={project.id}
          onClick={() => handleSelectProject(project)}
          className={`project-card ${
            selectedProjects.find((p) => p.id === project.id) ? "selected" : ""
          }`}
        >
          <h4>{project.name}</h4>
          <p>{project.location}</p>
        </div>
      ))
    ) : (
      <p>لا توجد نتائج</p>
    );

  return (
    <CustomModal
      isOpen={isOpen}
      setIsOpen={onClose}
      modalTitle="إضافة مشاريع"
      submitBtnTitle="إضافة"
      onSubmit={handleSubmit}
      styles={{ width: "600px" }}
    >
      <CustomInput
        inputType="input"
        label="ابحث عن مشاريع"
        value={searchedKey}
        setValue={setSearchedKey}
      />

      <div className="project-section">
        <h3>اختر المشاريع</h3>
        <div className="cards-holder">{cards}</div>
      </div>
    </CustomModal>
  );
};

export default AddModal;
