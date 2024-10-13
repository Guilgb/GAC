import { firestore } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { UserDTO, UserReponse } from '../../../../src/modules/user/use-cases/dto/user.dto';
import { UpdateData } from '@google-cloud/firestore';
import { StudyDTO } from '../../../../src/modules/user/use-cases/dto/study.dto';
import { ActivitiesDTO } from '../../../../src/modules/user/use-cases/dto/activities.dto';
export declare class FirestoreUserService {
    private readonly request;
    private readonly firebaseAdmin;
    private collenction;
    constructor(request: {
        user: any;
    }, firebaseAdmin: typeof admin);
    createUser(createUser: UserDTO): Promise<{
        name: string;
        email: string;
        isAdmin: boolean;
        activities: import("../entities/activities.entity").Activities[];
        studies: import("../entities/study.entity").Study[];
        password: string;
        registration: string;
        permissions: string[];
        id: string;
    }>;
    findAllUsers(): Promise<{
        id: string;
    }[]>;
    findOneUser(id: string): Promise<UserReponse>;
    removeUser(id: string): Promise<firestore.WriteResult>;
    updateUser(id: string, updateUser: UpdateData<UserDTO>): Promise<void>;
    createStudy(userId: string, study: StudyDTO): Promise<{
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
        activities: import("../entities/activities.entity").Activities[];
        studies: import("../entities/study.entity").Study[];
        password: string;
        registration: string;
        permissions: string[];
    }>;
    removeStudy(userId: string, studyId: string): Promise<{
        id: string;
        studies: import("../entities/study.entity").Study;
    }>;
    updateStudy(userId: string, studyId: string, study: StudyDTO): Promise<{
        id: string;
        studies: StudyDTO;
    }>;
    getAllStudiesForUser(userId: string): Promise<import("../entities/study.entity").Study[]>;
    getStudyById(userId: string, studyId: string): Promise<import("../entities/study.entity").Study>;
    allStudies(): Promise<StudyDTO[]>;
    createActivities(userId: string, activities: ActivitiesDTO): Promise<{
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
        activities: import("../entities/activities.entity").Activities[];
        studies: import("../entities/study.entity").Study[];
        password: string;
        registration: string;
        permissions: string[];
    }>;
    removeActivities(userId: string, activitiesId: string): Promise<{
        id: string;
        activities: import("../entities/activities.entity").Activities;
    }>;
    updateActivities(userId: string, activitiesId: string, activities: ActivitiesDTO): Promise<{
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
        activities: import("../entities/activities.entity").Activities[];
        studies: import("../entities/study.entity").Study[];
        password: string;
        registration: string;
        permissions: string[];
    }>;
    getAllActivitiesForUser(userId: string): Promise<import("../entities/activities.entity").Activities[]>;
    getActivityById(userId: string, activitiesId: string): Promise<import("../entities/activities.entity").Activities>;
}
