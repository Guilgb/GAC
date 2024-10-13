import { UserDTO } from './use-cases/dto/user.dto';
import { UserUseCase } from './use-cases/user.use-case';
import { StudyDTO } from './use-cases/dto/study.dto';
import { ActivitiesDTO } from './use-cases/dto/activities.dto';
export declare class UserController {
    private readonly userUseCase;
    constructor(userUseCase: UserUseCase);
    createUser(createUser: UserDTO): Promise<{
        name: string;
        email: string;
        isAdmin: boolean;
        activities: import("../db/entities/activities.entity").Activities[];
        studies: import("../db/entities/study.entity").Study[];
        password: string;
        registration: string;
        permissions: string[];
        id: string;
    }>;
    findAll(): Promise<{
        id: string;
    }[]>;
    finOne(params: {
        id: string;
    }): Promise<import("./use-cases/dto/user.dto").UserReponse>;
    remove(params: {
        id: string;
    }): Promise<FirebaseFirestore.WriteResult>;
    update(params: {
        id: string;
    }, updateUser: UserDTO): Promise<void>;
    createStudy(params: {
        id: string;
    }, createStudy: StudyDTO): Promise<{
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
        activities: import("../db/entities/activities.entity").Activities[];
        studies: import("../db/entities/study.entity").Study[];
        password: string;
        registration: string;
        permissions: string[];
    }>;
    deleteStudy(params: {
        id: string;
        studyId: string;
    }): Promise<{
        id: string;
        studies: import("../db/entities/study.entity").Study;
    }>;
    updateStudy(params: {
        id: string;
        studyId: string;
    }, updateStudy: StudyDTO): Promise<{
        id: string;
        studies: StudyDTO;
    }>;
    getAllStudiesForUser(params: {
        id: string;
    }): Promise<import("../db/entities/study.entity").Study[]>;
    getStudyById(params: {
        id: string;
        studyId: string;
    }): Promise<import("../db/entities/study.entity").Study>;
    getAllStudies(): Promise<StudyDTO[]>;
    createActivities(params: {
        id: string;
    }, activities: ActivitiesDTO): Promise<{
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
        activities: import("../db/entities/activities.entity").Activities[];
        studies: import("../db/entities/study.entity").Study[];
        password: string;
        registration: string;
        permissions: string[];
    }>;
    deleteActivities(params: {
        id: string;
        activitiesId: string;
    }): Promise<{
        id: string;
        activities: import("../db/entities/activities.entity").Activities;
    }>;
    updateActivities(params: {
        id: string;
        activitiesId: string;
    }, activities: ActivitiesDTO): Promise<{
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
        activities: import("../db/entities/activities.entity").Activities[];
        studies: import("../db/entities/study.entity").Study[];
        password: string;
        registration: string;
        permissions: string[];
    }>;
    getAllActivitiesForUser(params: {
        id: string;
    }): Promise<import("../db/entities/activities.entity").Activities[]>;
    getActivitiesById(params: {
        id: string;
        activitiesId: string;
    }): Promise<import("../db/entities/activities.entity").Activities>;
}
