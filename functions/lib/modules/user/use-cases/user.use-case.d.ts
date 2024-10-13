import { UserDTO } from './dto/user.dto';
import { FirestoreUserService } from '../../../modules/db/services/firestoreUser.service';
import { StudyDTO } from './dto/study.dto';
import { ActivitiesDTO } from './dto/activities.dto';
export declare class UserUseCase {
    private readonly firestoreService;
    constructor(firestoreService: FirestoreUserService);
    createUser(createUser: UserDTO): Promise<{
        name: string;
        email: string;
        isAdmin: boolean;
        activities: import("../../db/entities/activities.entity").Activities[];
        studies: import("../../db/entities/study.entity").Study[];
        password: string;
        registration: string;
        permissions: string[];
        id: string;
    }>;
    findAllUsers(): Promise<{
        id: string;
    }[]>;
    findOneUser(id: string): Promise<import("./dto/user.dto").UserReponse>;
    removeUser(id: string): Promise<FirebaseFirestore.WriteResult>;
    updateUser(id: string, updateUser: UserDTO): Promise<void>;
    createStudy(userId: string, study: StudyDTO): Promise<{
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
        activities: import("../../db/entities/activities.entity").Activities[];
        studies: import("../../db/entities/study.entity").Study[];
        password: string;
        registration: string;
        permissions: string[];
    }>;
    removeStudy(userId: string, studyId: string): Promise<{
        id: string;
        studies: import("../../db/entities/study.entity").Study;
    }>;
    updateStudy(userId: string, studyId: string, study: StudyDTO): Promise<{
        id: string;
        studies: StudyDTO;
    }>;
    getAllStudiesForUser(userId: string): Promise<import("../../db/entities/study.entity").Study[]>;
    getStudyById(userId: string, studyId: string): Promise<import("../../db/entities/study.entity").Study>;
    allStudies(): Promise<StudyDTO[]>;
    createActivities(userId: string, activities: ActivitiesDTO): Promise<{
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
        activities: import("../../db/entities/activities.entity").Activities[];
        studies: import("../../db/entities/study.entity").Study[];
        password: string;
        registration: string;
        permissions: string[];
    }>;
    removeActivities(userId: string, activitiesId: string): Promise<{
        id: string;
        activities: import("../../db/entities/activities.entity").Activities;
    }>;
    updateActivities(userId: string, activitiesId: string, activities: ActivitiesDTO): Promise<{
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
        activities: import("../../db/entities/activities.entity").Activities[];
        studies: import("../../db/entities/study.entity").Study[];
        password: string;
        registration: string;
        permissions: string[];
    }>;
    getAllActivitiesForUser(userId: string): Promise<import("../../db/entities/activities.entity").Activities[]>;
    getActivityById(userId: string, activitiesId: string): Promise<import("../../db/entities/activities.entity").Activities>;
}
